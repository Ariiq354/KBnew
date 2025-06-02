<script setup lang="ts">
  import Highlight from "@tiptap/extension-highlight";
  import Subscript from "@tiptap/extension-subscript";
  import Superscript from "@tiptap/extension-superscript";
  import TextAlign from "@tiptap/extension-text-align";
  import Underline from "@tiptap/extension-underline";
  import StarterKit from "@tiptap/starter-kit";
  import Heading from "@tiptap/extension-heading";
  import { EditorContent, useEditor } from "@tiptap/vue-3";

  const editorData = defineModel<string>();
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Subscript,
      Superscript,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "ring ring-inset ring-accented focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary h-48 p-4 overflow-y-auto prose max-w-none prose-base outline-none rounded-md",
      },
    },
    content: editorData.value,
    onUpdate: () => {
      editorData.value = editor.value!.getHTML();
    },
  });
</script>

<template>
  <ClientOnly>
    <div
      class="mb-2 flex gap-2 divide-x-2 rounded-md ring ring-inset ring-accented p-2"
    >
      <div class="flex gap-2">
        <UTooltip text="Heading 1">
          <button
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            type="button"
            :class="{
              'bg-gray-200': editor?.isActive('heading', {
                level: 1,
              }),
            }"
            @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
          >
            <UIcon name="i-lucide-heading-1" />
          </button>
        </UTooltip>
        <UTooltip text="Heading 2">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('heading', {
                level: 2,
              }),
            }"
            @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
          >
            <UIcon name="i-lucide-heading-2" />
          </button>
        </UTooltip>
        <UTooltip text="Heading 3">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('heading', {
                level: 3,
              }),
            }"
            @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
          >
            <UIcon name="i-lucide-heading-3" />
          </button>
        </UTooltip>
      </div>
      <div class="flex gap-2 pl-2">
        <UTooltip text="Bold">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('bold'),
            }"
            @click="editor?.chain().focus().toggleBold().run()"
          >
            <UIcon name="i-lucide-bold" />
          </button>
        </UTooltip>
        <UTooltip text="Italic">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('italic'),
            }"
            @click="editor?.chain().focus().toggleItalic().run()"
          >
            <UIcon name="i-lucide-italic" /></button
        ></UTooltip>
        <UTooltip text="Underline">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('underline'),
            }"
            @click="editor?.chain().focus().toggleUnderline().run()"
          >
            <UIcon name="i-lucide-underline" /></button
        ></UTooltip>
        <UTooltip text="Strike">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('strike'),
            }"
            @click="editor?.chain().focus().toggleStrike().run()"
          >
            <UIcon name="i-lucide-strikethrough" /></button
        ></UTooltip>
        <UTooltip text="Highlight">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('highlight'),
            }"
            @click="editor?.chain().focus().toggleHighlight().run()"
          >
            <UIcon name="i-lucide-pencil" /></button
        ></UTooltip>
        <UTooltip text="Subscript">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('subscript'),
            }"
            @click="editor?.chain().focus().toggleSubscript().run()"
          >
            <UIcon name="i-lucide-subscript" /></button
        ></UTooltip>
        <UTooltip text="Superscript">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('superscript'),
            }"
            @click="editor?.chain().focus().toggleSuperscript().run()"
          >
            <UIcon name="i-lucide-superscript" /></button
        ></UTooltip>
      </div>
      <div class="flex gap-2 pl-2">
        <UTooltip text="Left">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive({ textAlign: 'left' }),
            }"
            @click="editor?.chain().focus().setTextAlign('left').run()"
          >
            <UIcon name="i-lucide-align-left" />
          </button>
        </UTooltip>
        <UTooltip text="Center">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive({ textAlign: 'center' }),
            }"
            @click="editor?.chain().focus().setTextAlign('center').run()"
          >
            <UIcon name="i-lucide-align-center" />
          </button>
        </UTooltip>
        <UTooltip text="Right">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive({ textAlign: 'right' }),
            }"
            @click="editor?.chain().focus().setTextAlign('right').run()"
          >
            <UIcon name="i-lucide-align-right" />
          </button>
        </UTooltip>
      </div>
      <div class="flex gap-2 pl-2">
        <UTooltip text="Bullet list">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('bulletList'),
            }"
            @click="editor?.chain().focus().toggleBulletList().run()"
          >
            <UIcon name="i-lucide-list" />
          </button>
        </UTooltip>
        <UTooltip text="Ordered list">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('orderedList'),
            }"
            @click="editor?.chain().focus().toggleOrderedList().run()"
          >
            <UIcon name="i-lucide-list-ordered" />
          </button>
        </UTooltip>
        <UTooltip text="Quote">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            :class="{
              'bg-gray-200': editor?.isActive('blockquote'),
            }"
            @click="editor?.chain().focus().toggleBlockquote().run()"
          >
            <UIcon name="i-lucide-text-quote" />
          </button>
        </UTooltip>
      </div>
      <div class="flex gap-2 pl-2">
        <UTooltip text="Line Break">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            @click="editor?.chain().focus().setHardBreak().run()"
          >
            <UIcon name="i-lucide-wrap-text" />
          </button>
        </UTooltip>
        <UTooltip text="Horizontal Line">
          <button
            type="button"
            class="flex items-center justify-center rounded-lg p-2 transition-all duration-300"
            @click="editor?.chain().focus().setHorizontalRule().run()"
          >
            <UIcon name="i-lucide-minus" />
          </button>
        </UTooltip>
      </div>
    </div>
    <editor-content :editor="editor" />
  </ClientOnly>
</template>

<style>
  .tiptap li p {
    display: inline;
    margin: 0;
  }
</style>
