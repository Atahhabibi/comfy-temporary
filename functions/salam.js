

//domain/.netlfy/functions/salam

const items=[

    {id:1, name:"john"},
    {id:2, name:"peter"},
    {id:3, name:"susan"}
]


exports.handler=async function(event,context){
    return {
        statusCode:200,
        body:JSON.stringify(items),
    }
}