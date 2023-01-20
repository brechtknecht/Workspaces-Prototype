class Person {
    constructor(name, image, workspaces) {
        this.name = name;
        this.image = image;
        this.workspaces = workspaces
    }
}

// Design-Workspace: '0227-4a90'
// Development-Workspace: 'e272-4423'
// Review-Workspace: '66ef-466a'

const persons = [
    new Person('Martin', 'image1.jpg',  ['0227-4a90' , 'e272-4423']), 
    new Person('Peter', 'image2.jpg',  ['0227-4a90', 'e272-4423']),
    new Person('Fred', 'image3.jpg',  ['0227-4a90', 'e272-4423', '66ef-466a']),
    new Person('Sophie', 'image4.jpg', ['66ef-466a']),
    new Person('Frank', 'image5.jpg', ['e272-4423', '66ef-466a']),
    new Person('Gustav', 'image7.jpg', ['e272-4423', '66ef-466a']),
    new Person('Jocelyn', 'image7.jpg', ['66ef-466a'])
]

export default persons