let server = require("../server")
let chai = require("chai"); 
let chaiHttp = require("chai-http"); 

chai.should(); 
chai.use(chaiHttp); 



describe('TodoList API', () => {

    describe("Test GET route /hello", () => {
        it("It should return a message hello", (done) => {
            chai.request(server)
                .get("/hello")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('message').eq("hello"); 
                done();
                });
        });
    });


}); 