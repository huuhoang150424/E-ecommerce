import { ClassicEditor, Bold, Essentials, Italic, Paragraph,Alignment  } from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

interface CkeditorProps {
  onChange?: (value: string) => void ; 
  value?: string; 
}

export default function Ckeditor({ onChange ,value}: CkeditorProps) {
  const handleChange=(e:any,editor:any)=>{
    const data=editor.getData()
    if (onChange) {
      onChange(data);
    }
  }
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        plugins: [Essentials, Bold, Italic, Paragraph,Alignment],
        toolbar: ['undo', 'redo', '|', 'bold', 'italic','|', 'alignment:left', 'alignment:center', 'alignment:right'],
      }}
      data={value || '<p></p>'}
      contextItemMetadata={{
        name: 'editor1',
        yourAdditionalData: 2
      }}
      onReady={(editor) => {
        //console.log('Editor 1 is ready to use!', editor);
      }}
      onChange={handleChange}
    />
  )
}
