import React, { useState, useEffect} from "react";
import { Node, Text} from 'slate'
import escapeHtml from 'escape-html'
import Guest from './guest';
import Title from '../title';
import Subscribe from '../subscribe';
import s from './info_page_u.module.scss';
const com = ({item, ...props} ) => { 
  let {title, name, content}=item

  
  
  const serialize3 = node => {
    if (Text.isText(node)) {
      let string = escapeHtml(node.text)
      if (node.bold) {
        string = `<strong>${string}</strong>`
      }else if (node.italic) {
        string = `<em>${string}</em>`
      }else if (node.underline) {
        string = `<u>${string}</u>`
      }else if (node.code) {
        string = `<code>${string}</code>`
      }
      return string
    }

    const children = node.children.map(n => serialize3(n)).join('')
    console.log("node", node)
    switch (node.type) {
      case 'quote':
        return `<blockquote><p>${children}</p></blockquote>`
      case 'paragraph':
        return `<p>${children}</p>`
      case 'heading-one':
        return `<h1>${children}</h1>`
      case 'heading-two':
        return `<h2>${children}</h2>`
      case 'heading-three':
        return `<h3>${children}</h3>`
      case 'numbered-list':
        return `<ol>${children}</ol>`
      case 'bulleted-list':
        return `<ul>${children}</ul>`
      case 'list-item':
        return `<li>${children}</li>`
      case 'link':
        return `<a href="${escapeHtml(node.url)}">${children}</a>`
      default:
        return children
    }
  }

  const serialize = nodes => { 
    let out=nodes.map(n => serialize3(n)).join('\n')
    return out
  }
  let html
  if(item.content){
    content=JSON.parse(content)
    html=serialize(content)
  }

  return (
    <Guest {...props} viewType="guest">   
      <div className={s.main}>   
        <div className={s.container}>
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: html }} ></div>   
        </div>
      </div>
    </Guest>    
  )
}
export default com
