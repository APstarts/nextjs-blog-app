'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = ({ onChange }: { onChange?: (content: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p></p>',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

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
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Basic inline formatting */}
        <button type="button" className="bg-gray-200 px-2 rounded" onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
        <button type="button" className="bg-gray-200 px-2 rounded italic" onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
        <button type="button" className="bg-gray-200 px-2 rounded line-through" onClick={() => editor.chain().focus().toggleStrike().run()}>S</button>

        {/* Headings */}
        <button type="button" className="bg-gray-200 px-2 rounded" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>H1</button>
        <button type="button" className="bg-gray-200 px-2 rounded" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button type="button" className="bg-gray-200 px-2 rounded" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>H3</button>

        {/* Lists */}
        <button type="button" className="bg-gray-200 px-2 rounded" onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button type="button" className="bg-gray-200 px-2 rounded" onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>

        {/* Blockquote & Code */}
        <button type="button" className="bg-gray-200 px-2 rounded" onClick={() => editor.chain().focus().toggleBlockquote().run()}>&ldquo; Quote</button>
        <button type="button" className="bg-gray-200 px-2 rounded" onClick={() => editor.chain().focus().toggleCodeBlock().run()}>Code</button>

        {/* Undo/Redo */}
        <button type="button" className="bg-gray-200 px-2 rounded" onClick={() => editor.chain().focus().undo().run()}>Undo</button>
        <button type="button" className="bg-gray-200 px-2 rounded" onClick={() => editor.chain().focus().redo().run()}>Redo</button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="prose max-w-none [&_.ProseMirror]:focus:outline-none"
      />
    </div>
  )
}

export default Tiptap
