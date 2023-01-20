import persons from './person.config'


let workspace1 = persons.filter(person => {
    return person.workspaces.find(workspace => workspace == '0227-4a90')
})

let workspace2 = persons.filter(person => {
    return person.workspaces.find(workspace => workspace == 'e272-4423')
})

let workspace3 = persons.filter(person => {
    return person.workspaces.find(workspace => workspace == '66ef-466a')
})



// workspace: {
export default [
    {
        properties: {
            title: "Private Space",
            type: "Private",
            id: "0000-0000",
            spaces: [
                {
                    id: '4935-32sd-a1eb',
                    windows: [
                        {
                            id: 'Tasty',
                            frame: {
                                width: 460,
                                height: 330,
                                x: 400,
                                y: 100
                            }
                        }
                    ]  
                },
            ],
        }
    },
    {
        properties: {
            title: "Design Workspace",
            type: "Workspace",
            id: "0227-4a90",
            members: workspace1,
            spaces: [
                {
                    id: '9375-11ed-a1eb',
                    windows: [
                        {
                            id: 'Figma',
                            frame: {
                                width: 720,
                                height: 440,
                                x: 120,
                                y: 50
                            },
                            iframe: {
                                url: 'https://portfolio.fjal.fi'
                            }
                        },
                        {
                            id: 'Miro',
                            frame: {
                                width: 460,
                                height: 330,
                                x: 400,
                                y: 300
                            }
                        }
                    ]  
                },
                {
                    id: '9376-11ed-a1eb',
                    windows: [
                        {
                            id: 'Google Docs',
                            frame: {
                                width: 720,
                                height: 640,
                                x: 120,
                                y: 50
                            }
                        },
                        {
                            id: 'Miro',
                            frame: {
                                width: 460,
                                height: 330,
                                x: 400,
                                y: 300
                            }
                        }
                    ]  
                },
            ],
            multiplayer: {
                roomId: '88b0fca8',
                isMultiplayerSession: false,
                attendants: [],
                multiplayerWindows: []
            }
        }
    },
    {
        properties: {
            id: "e272-4423",
            title: "Development Workspace",
            type: "Workspace",
            members: workspace2,
            spaces: [
                {
                    id: '9875-11ed-b1eb',
                    windows: [
                        {
                            id: 'Visual Studio Code',
                            frame: {
                                width: 920,
                                height: 720,
                                x: 20,
                                y: 80
                            }
                        },
                        {
                            id: 'Terminal',
                            frame: {
                                width: 260,
                                height: 130,
                                x: 600,
                                y: 500
                            }
                        }
                    ]  
                },
                {
                    id: '9876-11ed-b1eb',
                    windows: [
                        {
                            id: 'Slack',
                            frame: {
                                width: 720,
                                height: 640,
                                x: 120,
                                y: 50
                            }
                        },
                        {
                            id: 'Google Chrome',
                            frame: {
                                width: 460,
                                height: 330,
                                x: 400,
                                y: 300
                            }
                        }
                    ]  
                },
            ],
            multiplayer: {
                roomId: '88b2dfdc',
                isMultiplayerSession: false,
                attendants: [],
                multiplayerWindows: []
            }
        }
    },
    {
        properties: {
            title: "Review Workspace",
            type: "Workspace",
            id: '66ef-466a',
            members: workspace3,
            spaces: [
                {
                    id: '5674-11ed-c1eb',
                    windows: [
                        {
                            id: 'Asana',
                            frame: {
                                width: 920,
                                height: 720,
                                x: 20,
                                y: 80
                            }
                        },
                        {
                            id: 'Google Meet',
                            frame: {
                                width: 260,
                                height: 130,
                                x: 600,
                                y: 500
                            }
                        }
                    ]  
                }
            ],
            multiplayer: {
                roomId: '9f04c962',
                isMultiplayerSession: false,
                attendants: [],
                multiplayerWindows: []
            }
        }
    }    
    
]