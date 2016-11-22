/* 
 * mandel.js
 */

var numberOfWorkers = 8;
var workers = [];

var nextRow = 0;
var generation = 0;

window.onload = init;

function init() {
    setupGraphics();

    //
    // Create all the workers and set up the message handler.  
    // 	Add each worker to the workers array.
    //
    for (var i = 0; i < numberOfWorkers; i++) {
        var worker = new Worker("worker.js");

        worker.onmessage = function(event) {
            processWork(event.target, event.data)
        }

        worker.idle = true;
        workers.push(worker);
    }

    //
    // Start the workers
    //
    startWorkers();

}

//
// startWorkers
//	This function resets the workers to start them working
//		at the top of the fractal (row 0). It loops through
//		all the workers in the workers array and assigns
//		each worker a task to compute a row.
//	By posting a message with the task, we start the
//		worker's computation.
//
function startWorkers() {
    generation++;
    nextRow = 0;
    for (var i = 0; i < workers.length; i++) {
        var worker = workers[i];
        if (worker.idle) {
            var task = createTask(nextRow);
            worker.idle = false;
            worker.postMessage(task);
            nextRow++;
        }
    }
}

//
// processWork
// 	This is the function we call when the worker posts
//		back a message with the results.
//	If the worker is working on the current fractal
//		generation, we draw the row of data, otherwise
//		we just throw the data away.
//	Once we've used the results, we assign the worker to
//		start computing another row.
//    
function processWork(worker, workerResults) {
    if (workerResults.generation == generation) {
        drawRow(workerResults);
    }
    reassignWorker(worker);
}

//
// reassignWorker
//	This function gives an idle worker its next task.
//
function reassignWorker(worker) {
    var row = nextRow++;
    if (row >= canvas.height) {
        worker.idle = true;
    } else {
        var task = createTask(row);
        worker.idle = false;
        worker.postMessage(task);
    }
}