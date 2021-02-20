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

    describe("Test GET route /done", () => {
        it("It should return an array of tasks that are completed", (done) => {
            chai.request(server)
                .get("/done")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                });
        });
    });

    describe("Test GET route /notdone", () => {
        it("It should return an array of tasks that are not completed", (done) => {
            chai.request(server)
                .get("/notdone")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                });
        });
    });

    describe("Test POST route /", () => {
        it("It should create a new task that is not completed", (done) => {
            const task = {
                title: "Test",
                body: "Testing Post Request"
            };
            chai.request(server)                
                .post("/")
                .send(task)
                .end((err, response) => {
                    response.should.have.status(201);
                done();
                });
        });
    });

    describe("Test PUT route /:id", () => {
        it("It should update an existing task to completed", (done) => {
            const taskId = 1;
            chai.request(server)                
                .put("/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });
    });
    
    describe("Test DELETE route /:id", () => {
        it("It should DELETE an existing task", (done) => {
            const taskId = 500;
            chai.request(server)                
                .delete("/" + taskId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

    });




}); 