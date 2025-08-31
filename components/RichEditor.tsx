'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import { useEffect } from 'react'

const RichEditor = ({content = "<p></p>", onChange}: {content?: string, onChange?: (content: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit, Bold, Italic, Strike],
    content ,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {  //here we are using the onUpdate callback to get the content of the editor whenever it changes.
      onChange?.(editor.getHTML());
    }
  })

  //keep editor in sync with content changes edit mode
  useEffect(() => {
    if(editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content, {emitUpdate: false});
    }
  }, [content, editor])
  
  if (!editor) {
    return null
  }

  

  return (
    <div
      className="
        border border-gray-300 rounded-xl shadow-sm
        p-4 min-h-[200px]
        bg-white
        focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500
      "
    >
      <div className='flex gap-2 mb-4'>
        <button type="button" className='bg-gray-200 text-black w-6 rounded-md' onClick={() => {editor.chain().focus().toggleBold().run()}}>B</button>
        <button type="button" className={`bg-gray-200 text-black w-6 rounded-md`} onClick={() => {editor.chain().focus().toggleItalic().run()}}>I</button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={`bg-gray-200 text-black w-max px-2 rounded-md`}>Strike</button>
      </div>
      {/* ProseMirror gets Tailwind typography */}
      <EditorContent
        editor={editor}
        className="prose max-w-none [&_.ProseMirror]:focus:outline-none" //you inside the square bracket is for child element you research or ask chatgpt to understand how grabbing already existing classes on tailwind works.
      />
    </div>
  )
}

export default RichEditor
