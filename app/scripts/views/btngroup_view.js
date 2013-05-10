'use strict';
OccupOS.BtngroupView = Ember.View.extend({
    templateName: 'btngroup',
    click: function(e){
        console.log('Clickhandler wooo');
        var clickedButton = $(e.target);
        console.log('test1');
        if(clickedButton.hasClass('active')){
            clickedButton.siblings().removeClass('active');
            clickedButton.addClass('active');
            return null;
        }
        console.log('Clickhandler test2');
        if(clickedButton.hasClass('room')){
            console.log('Clickhandler test3');
            console.log(clickedButton.closest('ul').siblings('button.dropdown-toggle:first').find('span.selected'));
            clickedButton.closest('ul').siblings('button.dropdown-toggle:first')
                .find('span.selected').text(clickedButton.text());
            clickedButton.closest('.selected').text(clickedButton.text());
        }
    }
});