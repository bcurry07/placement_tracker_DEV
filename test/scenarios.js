'use strict';

describe('placement tracker app', function() {


//    it('should expect 3 to equal 3', function() {
//       expect(3).toBe(3);
//    });

    describe('side panel table', function() {

        var numTotal = 0;

        beforeEach(function() {
            browser().navigateTo('/placements');
        });

        it ('should get the number on billing for the first client in the panel table', function() {

            element('.numTotal:first').query(function($el, done) {
                var elText = $el.text();
                numTotal = parseInt(elText);
                done();
            });

        });

        it ('should filter the table when clicking the first client name in the panel table', function() {

            element('td.clientName:first').query(function($el, done) {
                console.log($el.html());
                $el.click();
                done();
            });

            pause();
            expect(repeater('table.table-striped tr').count()).toBe(numTotal+1);
        });



    });

    describe('add/delete placement', function() {

        var rowCount = -1;

        beforeEach(function() {
            browser().navigateTo('/placements');
        });

        it ('should get the number of rows in the main table', function() {
            element('tbody:first').query(function($el, done) {

                rowCount = $el.children('tr').length+1;
                console.log(rowCount);
                done();
            });
        });

        it('should add another record to the table after adding a placement', function() {

            element('button').click();

            var today = new Date();

            input('placement.name').enter("Karma Kramer");
            input('placement.date').enter(today);
            input('placement.client').enter("Karma Client");
            input('placement.notes').enter("This is a Karma Test");

            element('button.btn-success').click();

            expect(repeater('table.table-striped tr').count()).toBe(rowCount+1);

            pause();

        });

        it('should remove the record from the table when it is deleted', function() {
           element('span.glyphicon-minus:first').click();
           element('button.confirmDelete').click();

            expect(repeater('table.table-striped tr').count()).toBe(rowCount);

        });




    });

});