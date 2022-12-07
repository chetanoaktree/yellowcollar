import React, { useState,  useCallback, useMemo} from 'react';
import { Node, Text, Editor,  Transforms, createEditor, Element as SlateElement } from 'slate'
import { Editable, withReact, useSlate, Slate} from 'slate-react'
import { withHistory,  } from 'slate-history'
import isHotkey from 'is-hotkey'
import escapeHtml from 'escape-html'
import Button from '../../../../button';

import s from './slate.module.scss';

const com = (props) => { 
  const {name, title, content, update_item }=props
  console.log("slate", props)
  const renderElement = useCallback(ps => <Element {...ps} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  
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
    //console.log("node", node)
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
  

  

  const initialValue= [
    {
      type: 'paragraph',      
      children:[
        { text: content ? content : 'no content' },
        { text: 'rich', bold: true },
        { text: ' text, ' },
        { text: 'much', italic: true },
        { text: ' better than a ' },
        { text: '<textarea>', code: true },
        { text: '!' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text:
            "Since it's rich text, you can do things like turn a selection of text ",
        },
        { text: 'bold', bold: true },
        {
          text:
            ', or add a semantically rendered block quote in the middle of the page, like this:',
        },
      ],
    },
  ]

  const slateValue = content ? JSON.parse(content) : initialValue

  //console.log("serialize", serialize(slateValue))


  const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
  }
  
  
  return (    
    <div className={s.slate}>
      <Slate 
        editor={editor} 
        value={slateValue}
        onChange={value => {
          const isAstChange = editor.operations.some(
            op => 'set_selection' !== op.type
          )
          if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value)
            console.log("value", value)
            console.log("content", content)
            update_item(content, name)
            //localStorage.setItem('content', content)
          }
        }}
      >
        <div className={s.toolbar}>
          <MarkButton format="bold" icon="bold" /> 
          <MarkButton format="italic" icon="italic" />
          <MarkButton format="underline" icon="underline" /> 
          <BlockButton format="heading-one" icon="h1" />
          <BlockButton format="heading-two" icon="h2" />
          <BlockButton format="heading-three" icon="h3" />
          <BlockButton format="numbered-list" icon="list_numbered" /> 
          <BlockButton format="bulleted-list" icon="list_bulleted" /> 
          <BlockButton format="f" icon="f" />                   
        </div>
        <Editable 
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Enter some plain text..." 
          onKeyDown={event => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                toggleMark(editor, mark)
              }
            }
          }}        
        />
      </Slate>    
      {/*<div dangerouslySetInnerHTML={{ __html: serialize(slateValue) }} ></div>   */}
    </div>
  )
}
export default com

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  )
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  })
  let newProperties
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    }
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    }
  }
  Transforms.setNodes(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  )

  return !!match
}

//Easy to Understand

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}


const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      type="action2"  size="sm"  color="white" state={true} className="mr-2"
      isActive={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      clickHandler={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {icon}
    </Button>
  )
}


const MarkButton = ({ format, icon }) => {
    const editor = useSlate()
    return (
      <Button 
        type="action2"  size="sm"  color="white" state={true} className="mr-2"
        isActive={isMarkActive(editor, format)}
           
        clickHandler={event => {
          event.preventDefault()
          toggleMark(editor, format)
        }}
      >
        {icon} 
      </Button>
    )
}  

  
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align }
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      )
    case 'heading-three':
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      )
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      )
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      )
    case 'f':
      return (
        <div style={{...style, fontWeight:'bold'}} {...attributes}>
          {children}
        </div>
      )
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      )
  }
  }

