class Person {
    constructor(name, image, workspaces, color) {
        this.name = name;
        this.image = image;
        this.workspaces = workspaces
        this.color = color
    }
}

// Design-Workspace: '0227-4a90'
// Development-Workspace: 'e272-4423'
// Review-Workspace: '66ef-466a'

const persons = [
    new Person('Martin', 'image1.jpg',  ['0227-4a90' , 'e272-4423'], '#FFBB4B'), 
    new Person('Peter', 'image2.jpg',  ['0227-4a90', 'e272-4423'], '#FF5A5A'),
    new Person('Fred', 'image3.jpg',  ['0227-4a90', 'e272-4423', '66ef-466a'], '#00AEEF'),
    new Person('Sophie', 'image4.jpg', ['66ef-466a'], '#7800EF'),
    new Person('Frank', 'image5.jpg', ['e272-4423', '66ef-466a'], '#EF0073'),
    new Person('Gustav', 'image7.jpg', ['e272-4423', '66ef-466a'], '#31D0D0'),
    new Person('Jocelyn', 'image7.jpg', ['66ef-466a'], '#1C1C1C')
]

export default persons