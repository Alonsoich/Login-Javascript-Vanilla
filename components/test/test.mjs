import ComponentBase from "../component_base.mjs";
class Test extends ComponentBase{
    #template="components/test/test.html";
    render(){
        return this.fetchFile(this.#template);
    }
}
export {Test };