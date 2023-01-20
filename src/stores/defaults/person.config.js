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
    new Person(
        'Martin', 
        '/assets/Avatars/Peter.png',
        ['0227-4a90' , 'e272-4423'], 
        '#FFBB4B'
    ), 
    new Person(
        'Peter', 
        '/assets/Avatars/Peter.png',
        ['0227-4a90', 'e272-4423'], 
        '#FF5A5A'
    ),
    new Person(
        'Fred', 
        '/assets/Avatars/Felix.png',  
        ['0227-4a90', 'e272-4423', '66ef-466a'], 
        '#00AEEF'
    ),
    new Person(
        'Sophie', 
        '/assets/Avatars/Peter.png', 
        ['66ef-466a'], 
        '#7800EF'
    ),
    new Person(
        'Frank', 
        '/assets/Avatars/Peter.png',
        ['e272-4423', '66ef-466a'], 
        '#EF0073'
    ),
    new Person(
        'Gustav', 
        '/assets/Avatars/Peter.png',
        ['e272-4423', '66ef-466a'], 
        '#31D0D0'
    ),
    new Person(
        'Jocelyn', 
        '/assets/Avatars/Peter.png',
        ['66ef-466a'], 
        '#1C1C1C'
    )
]

export default persons