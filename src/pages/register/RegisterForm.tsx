import React from 'react';
import styles from './RegisterForm.module.css';
import { Form, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { userSlice } from '../../redux/user/slice';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/hooks';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const RegisterForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const mockData = useSelector(state => state.user.mockData)

    const onFinish = async (values: any) => {
        // try {
        //     await axios.post("/register", {
        //         username: values.username,
        //         password: values.password,
        //         confirmPassword: values.confirm
        //     })
        //     history.push('/signIn')
        // } catch (err) {
        //     message.error(`注册失败${err.message}`)
        // }

        // mock 数据
        if (!Object.keys(mockData)) {
            dispatch(userSlice.actions.mockups({
                ...mockData,
                [values.username]: values.password
            }))
            history.push('/signIn')
        }
        if (mockData[values.username]) return message.warning('用户已存在')
        dispatch(userSlice.actions.mockups({
            ...mockData,
            [values.username]: values.password
        }))
        history.push('/signIn')
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            className={styles['register-from']}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="确认密码"
                name="confirm"
                hasFeedback
                rules={[
                    { required: true, message: '请再次确认密码!' },
                    (({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject("密码不一致")
                        }
                    }))
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    确认
        </Button>
            </Form.Item>
        </Form>
    );
};