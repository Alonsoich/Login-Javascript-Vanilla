class ComponentBase{
    async fetchFile(resource){
        let content=await fetch(resource);
        let response=await content.text();
        return response;
    }
}
export default ComponentBase;