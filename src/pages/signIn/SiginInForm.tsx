import styles from './SignInForm.module.css';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/hooks';
import { signIn } from '../../redux/user/slice';
import { useEffect } from 'react';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export const SignInForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.user.loading)
    const error = useSelector(state => state.user.error)
    const jwt = useSelector(state => state.user.token)
    const mockData = useSelector(state => state.user.mockData)

    useEffect(() => { // 监听 jwt 来确定用户状态和权限
        if (jwt !== null) {
            history.push('/')
        }
    }, [jwt])

    const onFinish = async (values: any) => {
        // dispatch(signIn({
        //     username: values.username,
        //     password: values.password
        // }))

        // mock 数据
        if (mockData[values.username] !== values.password) return message.warning('密码不正确')
        dispatch(signIn({ [values.username]: values.password }))
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            className={styles['signIn-from']}
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

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Link to={'/register'} style={{ marginRight: 18, color: '#1890FF' }}>注册账号</Link>
                <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    确认
        </Button>
            </Form.Item>
        </Form>
    );
};