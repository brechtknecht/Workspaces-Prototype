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
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1600',  
        ['0227-4a90' , 'e272-4423'], 
        '#FFBB4B'
    ), 
    new Person(
        'Peter', 
        'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600',  
        ['0227-4a90', 'e272-4423'], 
        '#FF5A5A'
    ),
    new Person(
        'Fred', 
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600',  
        ['0227-4a90', 'e272-4423', '66ef-466a'], 
        '#00AEEF'
    ),
    new Person(
        'Sophie', 
        'https://images.pexels.com/photos/157661/young-woman-shooting-model-157661.jpeg?auto=compress&cs=tinysrgb&w=1600', 
        ['66ef-466a'], 
        '#7800EF'
    ),
    new Person(
        'Frank', 
        'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1600', 
        ['e272-4423', '66ef-466a'], 
        '#EF0073'
    ),
    new Person(
        'Gustav', 
        'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=1600', 
        ['e272-4423', '66ef-466a'], 
        '#31D0D0'
    ),
    new Person(
        'Jocelyn', 
        'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=1600', 
        ['66ef-466a'], 
        '#1C1C1C'
    )
]

export default persons