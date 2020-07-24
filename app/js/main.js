$(function(){
    let menuItem = $('.menu-item');

    menuItem.on('click', function(e){
        e.preventDefault();
        menuItem.removeClass('active');
        $(this).addClass('active');
    })
})