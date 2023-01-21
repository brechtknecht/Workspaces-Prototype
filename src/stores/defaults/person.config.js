class Person {
    constructor(id, name, image, workspaces, color) {
        this.id = id;
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
        'keys-m34s',
        'Martin',
        '/assets/Avatars/Peter.png',
        ['0227-4a90' , 'e272-4423'], 
        '#FFBB4B'
    ), 
    new Person(
        '39dl-snr3',
        'Peter', 
        '/assets/Avatars/Peter.png',
        ['0227-4a90', 'e272-4423'], 
        '#FF5A5A'
    ),
    new Person(
        'ld9e-ske3',
        'Fred', 
        '/assets/Avatars/Felix.png',  
        ['0227-4a90', 'e272-4423', '66ef-466a'], 
        '#00AEEF'
    ),
    new Person(
        'skex-20sl',
        'Sophie', 
        '/assets/Avatars/Peter.png', 
        ['66ef-466a'], 
        '#7800EF'
    ),
    new Person(
        '3pds-skem',
        'Frank', 
        '/assets/Avatars/Peter.png',
        ['e272-4423', '66ef-466a'], 
        '#EF0073'
    ),
    new Person(
        'swi2-ls21',
        'Gustav', 
        '/assets/Avatars/Peter.png',
        ['e272-4423', '66ef-466a'], 
        '#31D0D0'
    ),
    new Person(
        '93jd-xje2',
        'Jocelyn', 
        '/assets/Avatars/Peter.png',
        ['66ef-466a'], 
        '#1C1C1C'
    )
]

export default persons