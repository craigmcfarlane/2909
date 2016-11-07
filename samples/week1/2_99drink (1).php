<!doctype html>
<html lang="en">
    <head>
        <title>My First JavaScript</title>
        <meta charset="utf-8">
    </head>
    <body>
        <script>
function song() {

        // substitute your favorite drink below
            var BREAK = "<br>";
            var drink = "Crystal Pepsi";
            var lyrics = "";
            var cans = 99;
            while (cans > 0) {
                lyrics = lyrics + cans + " cans of " + drink + " on the wall "+ BREAK;
                lyrics = lyrics + cans + " cans of " + drink + BREAK;
                lyrics = lyrics + "Take one down, pass it around, "+ BREAK;
                if (cans > 1) {
                    lyrics = lyrics + (cans - 1) + " cans of " + drink + " on the wall "+ BREAK;
                }
                else {
                    lyrics = lyrics + "No more cans of " + drink + " on the wall "+ BREAK;
                }
                cans = cans - 1;
            }
            document.write(lyrics);
}

song();
        </script>
    </body>
</html>

