const Controller = require("./Controlador");
const { Username } = require("./Controlador");

const Singleton = (function () {
    var instancia;

    function createInstance() {
        var classObj = new Controller();
        return classObj;
    }

    return {
        getInstance: function () {
            if (!instancia) {
                instancia = createInstance();
            }
            return instancia;
        },
    };
})();

module.exports = Singleton;