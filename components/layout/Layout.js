import { Col, Drawer, Layout, Menu, Row } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import styles from './Layout.module.css';
import { MenuOutlined } from '@ant-design/icons'
import { useRouter } from "next/router";

const LayoutContainer = ({ children }) => {
  const [isToggled, setToggled] = useState(false);
  const onClose = () => {
    setToggled(false);
  };

  return (<Layout style={{ minHeight: '100vh' }}>

    {/* drawer for mobile  */}
    <Drawer
      title="Dev Web Tool"
      placement='left'
      onClose={onClose}
      open={isToggled}
      width='65%'
      bodyStyle={{ padding: 0 }}
    >
      <MenuLayout setToggled={setToggled} />
    </Drawer>

    {/* sider for desktop*/}
    <Layout.Sider
      className="hideOnMobile"
      theme="light"
      width={250}
    >
      <Link href='/' legacyBehavior>
        <div align='middle' className={styles.siderHeader}>Dev Web Tool</div>
      </Link>
      <MenuLayout setToggled={setToggled} />
    </Layout.Sider>

    {/* layout  */}
    <Layout className="site-layout">

      {/* header  */}
      <Layout.Header
        className="site-layout-background"
        style={{ padding: '0px 24px', backgroundColor: '#fff' }}
      >
        <div align='right' className="hideOnMobile">
          Dark mode
        </div>
        <div className="hideOnDesktop">
          <div className="justify-between items-center">
            <span onClick={() => setToggled(true)} style={{ cursor: 'pointer' }}><MenuOutlined /></span>
            <Link href='/' legacyBehavior>
              <span className={styles.header_layout}>Dev Web Tool</span>
            </Link>
            <span>Dark mode</span>
          </div>
        </div>
      </Layout.Header>
      <Layout.Content
        style={{
          margin: '24px 16px 0',
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: '#ffF',
          }}
        >
          {children}
        </div>
      </Layout.Content>
      <Layout.Footer
        style={{
          textAlign: 'center',
        }}
      >
        <p>Dev Web Tool ©2022 Created by <Link href={'https://github.com/EavOutDom'} target='_blank'>
          <strong style={{ color: '#0070f3' }}>Eav Outdom</strong>
        </Link>
        </p>
      </Layout.Footer>
    </Layout>
  </Layout>);
}

const MenuLayout = (props) => {
  const router = useRouter();
  const { tool } = router.query;
  const asPathWithoutQuery = router.asPath.split('/')[1];
  const [openKeys, setOpenKeys] = useState([asPathWithoutQuery]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (['css', 'html'].indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  function getItem(label, key, children, type) {
    return {
      key,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('CSS', 'css', [
      getItem('Animations', 'animations', [getItem('Keyframe Animation', 'keyframe-animation')], 'group'),
      getItem('Backgrounds', 'backgrounds', [getItem('Background Color', 'background-color'), getItem('Background Gradient', 'background-gradient'), getItem('Background Image', 'background-image')], 'group'),
      getItem('Box', 'box', [getItem('Border', 'border'), getItem('Border Image', 'border-image'), getItem('Border Radius', 'border-radius'), getItem('Box Shadow', 'box-shadow'), getItem('Opacity', 'opacity'), getItem('Outline', 'outline'), getItem('Overflow', 'overflow')], 'group'),
      getItem('Color', 'color', [getItem('Text Color', 'text-color')], 'group'),
    ]),
    getItem('HTML', 'html', [
      getItem('Item 1', 'g1', [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
      getItem('Item 2', 'g2', [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),
  ];

  const onClick = (e) => {
    props.setToggled(false);
    router.push(`/${e.keyPath[1]}/${e.keyPath[0]}`);
  };

  return <Menu
    onClick={onClick}
    style={{
      width: '100%',
    }}
    className='scroll_height'
    selectedKeys={[tool]}
    openKeys={openKeys}
    onOpenChange={onOpenChange}
    mode="inline"
    items={items}
  />
};
export default LayoutContainer;
