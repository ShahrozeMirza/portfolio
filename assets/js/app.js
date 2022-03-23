const TypeWriter = function(textElem,words,wait = 3000) {
 this.textElem = textElem;
 this.words = words;
 this.txt = '';
 this.wordIndex = 0;
 this.wait = parseInt(wait, 10);
 this.type();
 this.isDeleting = false;
}

//Type Method
TypeWriter.prototype.type = function() {
    // Current Index of the Word
    const currentWordIndex = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullText = this.words[currentWordIndex];

    // Check if Deleting
    if(this.isDeleting){
      // Remove a Character
      this.txt = fullText.substring(0, this.txt.length - 1);
    }
    else{
     // Add a Character   

     this.txt = fullText.substring(0, this.txt.length + 1);
    }

    // Insert Text into element
    this.textElem.innerHTML = `<span class="txt">${this.txt}<span class="typewriter-cursor">|</span></span>`

    // Initial Type Speed
    let typeSpeed = 100;

    if(this.isDeleting){
        typeSpeed /= 2; //typeSpeed = typeSpeed / 2;
    }

    // If word is complete

    if(!this.isDeleting && this.txt === fullText){
        // Make pause at end
        typeSpeed = this.wait;
        this.isDeleting = true;

    }

    else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 300;
        console.log(typeSpeed);
    }

    setTimeout(() => this.type(), typeSpeed);
}

//Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init() {
    const textElement = document.querySelector('.txt-type');
    const words = JSON.parse(textElement.getAttribute('data-words'));
    const wait = textElement.getAttribute('data-wait');

    //Init TypeWriter
    new TypeWriter(textElement, words, wait);
    console.log(wait); 
}

//Counter Up Plugin

$('.count').counterUp({
    delay: 10,
    time: 1000
});

