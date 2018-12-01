describe ("TestController", function() {
    let testController;

    beforeEach(() => {
        injector().inject((TestController) => {
            testController = TestController;
        });
    });

    it('TestController should exist', () => {
        expect(testController).to.exist;
	});
});

