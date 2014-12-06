(function() {
    function gameObject(objType, x, y, image) {
        this.x = x;
        this.y = y;
        if(objType == "background") {
            this.image = new Image();
            this.image.src = "/Game/Images/" + image;
        } else {
            this.frame = [];
            var objImage = new Image();
            objImage.src = "/Game/Images/ballSprite.png";
            this.frame.push(objImage);
        }
    }
})();