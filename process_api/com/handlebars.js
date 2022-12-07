import handlebars from 'handlebars'

const compile_template = ({source, data}) => {   
    var template = handlebars.compile(source)
    var result = template(data)    
    return result
}

export {
    compile_template
}
