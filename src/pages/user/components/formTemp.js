/* eslint-disable */
import { useRef, useState, useEffect,forwardRef,useImperativeHandle,memo } from 'react'
import {Form,Input} from 'antd'

const FormTemp = ({form,ref}) => {
    console.log(ref,'ref')
    const _form = useRef()
    const [data,setData] = useState({})
    const { getFieldDecorator, resetFields, validateFieldsAndScroll } = form


    useEffect(()=>{
        console.log('[],child')
    },[])

    useEffect(()=>{
        console.log('null,child')
    })

    useImperativeHandle(ref, () => {
        return {on:1}
    })

    const handleSubmit = () => {
        validateFieldsAndScroll((err,vals) => {
            console.log(err,vals,'vals')
        })
    }

    return(
        <Form layout="inline">
            <Form.Item label="name">
                {
                    getFieldDecorator('name',{
                        initialValue:data.name,
                        getValueFromEvent(e){
                            setData({...data,name:e.target.value})
                            return e.target.value
                        },
                        rules:[
                            {require:true,message:'name'}
                        ]
                    })(<Input placeholder="name"/>)
                }
            </Form.Item>
            <Form.Item label="user">
                {
                    getFieldDecorator('user',{
                        initialValue:data.user,
                        getValueFromEvent(e){
                            setData({...data,user:e.target.value})
                            return e.target.value
                        },
                        rules:[
                            {require:true,message:'name'}
                        ]
                    })(<Input placeholder="user"/>)
                }
            </Form.Item>
        </Form>
    )
}

const WrapForm  = Form.create({name:'form'})(FormTemp)
export default forwardRef((props,ref)=><div ref={ref}><WrapForm {...props}/></div>)
// export default memo(forwardRef(WrapForm))