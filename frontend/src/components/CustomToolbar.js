import {FileIcon} from '@primer/octicons-react'
import Quill from 'quill'
import '../assets/css/CustomToolbar.css'
import { useState } from 'react'

export const CustomToolbar = (props) => {

    let Font = Quill.import('formats/font')
    Font.whitelist = ['monospace', 'times-new-roman', 'inconsolata', 'roboto', 'mirza', 'arial'];
    Quill.register(Font, true);
    
    return(
        <div id='toolbar'>
            <button className="ql-save" onClick={props.updateDB}>
                <FileIcon size={16} />
            </button>
            <select className='ql-font'  defaultValue={''} onChange={(e) => e.persist()}>
                <option value=""></option>
                <option value="arial">Arial</option>
                <option value="monospace">Monospace</option>
                <option value="times-new-roman">Times New Roman</option>
                <option value="inconsolata">Inconsolata</option>
                <option value="roboto">Roboto</option>
                <option value="mirza">Mirza</option>
            </select>
            <select className='ql-header' defaultValue={''} onChange={(e) => e.persist()}>
                <option value='' />
                <option value='1' />
                <option value='2' />
                <option value='3' />
            </select>
            <button className='ql-bold' />
            <button className='ql-italic' />
            <select className='ql-color' defaultValue="#000" onChange={(e) => e.persist()}>
                <option value='#e74c3c' />
                <option value='green' />
                <option value=' #f1c40f ' />
                <option value=' #3498db ' />
                <option value=' #2471a3 ' />
                <option value=' #C70039 ' />
                <option value=' #FF5733 ' />
                <option value=' #273746 ' />
                <option value=' #6c3483 ' />
                <option value=' #d0d1d2 ' />
                <option value=" #000" />
            </select>
            <select className='ql-background' defaultValue="#000" onChange={(e) => e.persist()}>
                <option value='#e74c3c' />
                <option value='green' />
                <option value=' #f1c40f ' />
                <option value=' #3498db ' />
                <option value=' #2471a3 ' />
                <option value=' #C70039 ' />
                <option value=' #FF5733 ' />
                <option value=' #273746 ' />
                <option value=' #6c3483 ' />
                <option value=' #d0d1d2 ' />
                <option value=" #000" />
            </select>

            <button className="ql-list" value='bullet' />
            <button className="ql-list" value='ordered' />
            <button className='ql-align' value='' />
            <button className='ql-align' value='center' />
            <button className='ql-align' value='right' />
            <button className='ql-link'/>
        </div>
    )
}
