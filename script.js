let hall = document.querySelector('.movie-hall')
let seats = document.querySelectorAll('.row .seat:not(.occupied)')
let count = document.getElementById('count')
let total = document.getElementById('total')
let movie = document.getElementById('movie')



let ticketPrice = +movie.value;

populateUI()
updateSelectedCount()

function updateSelectedCount(){
    let selected = document.querySelectorAll('.row .seat.selected');

    // console.log(selected);

    selectedIndex = [...selected].map(function(seat){
        return [...seats].indexOf(seat)
    })

    // console.log(selectedIndex)
    localStorage.setItem('selectedSeats', JSON.stringify(selectedIndex))
    count.innerText = selected.length;
    total.innerText = selected.length * ticketPrice;
}

function setMovieData(movieIndex, moviePrice){

    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMovieValue', moviePrice)
}

hall.addEventListener('click', (e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
    }

    updateSelectedCount();
})

movie.addEventListener('change', () =>{
    ticketPrice = +movie.value;
    setMovieData(movie.selectedIndex, movie.value);
    updateSelectedCount();
})

function populateUI(){
    let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    let price = localStorage.getItem('selectedMovieValue')
    let selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    // Array.from(seats).forEach(element => {
    //     if(selectedSeats.includes(element)){
    //         console.log(seats[element]);
    //     }
    // });

    if(selectedSeats != null && selectedSeats.length > 0){
        Array.from(seats).forEach((seat, index) =>{
            if(selectedSeats.includes(index)){
                seat.classList.add('selected')
            }
        })

        movie.selectedIndex = selectedMovieIndex;
        

    }
}