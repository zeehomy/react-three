import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class Model extends Component {

  // 一个组件中第一个执行的函数
  constructor(props) {
    super(props);

    this.divRef = React.createRef();
    this.handleRenderModel = this.handleRenderModel.bind(this);
  }

  /**
   * 创建场景对象Scene
   */
  scene = new THREE.Scene();
 
  /**
   * 光源设置
   */
  //点光源
  point = new THREE.PointLight(0xffffff);
  
  //环境光
  ambient = new THREE.AmbientLight(0x444444);

  /**
   * 相机设置
   */
  width = window.innerWidth;      //窗口宽度
  height = window.innerHeight;    //窗口高度

  k = this.width / this.height;       //窗口宽高比
  s = 2;              //三维场景显示范围控制系数，系数越大，显示的范围越大

  //创建相机对象
  camera = new THREE.OrthographicCamera(-this.s * this.k, this.s * this.k, this.s, -this.s, -100, 1000);
  
  /**
   * 创建渲染器对象
   */
  renderer = new THREE.WebGLRenderer();
  
  // T0 = new Date();//上次时间

  // handleRenderModel() {
  //   const T1 = new Date();            //本次时间
  //   const t = T1 - this.T0;          //时间差
  //   this.T0 = T1;                    //把本次时间赋值给上次时间
  //   requestAnimationFrame(this.handleRenderModel);
  //   this.renderer.render(this.scene, this.camera);  //执行渲染操作
  //   this.mesh.rotateY(0.001 * t);                   //旋转角速度0.001弧度每毫秒
  // }

  handleRenderModel() {
    this.renderer.render(this.scene, this.camera);                      //执行渲染操作
  }

  controls = new OrbitControls(this.camera, this.renderer.domElement);  //创建控件对象

  render() {

    this.point.position.set(400, 200, 300);               //点光源位置
    this.scene.add(this.point);                            //点光源添加到场景中
    this.scene.add(this.ambient);

    this.camera.position.set(20, 30, 50);                  //设置相机位置
    this.camera.lookAt(0, 0, 0);                            //设置相机方向(指向的场景对象) scene.position

    this.renderer.setSize(this.width, this.height);            //设置渲染区域尺寸
    // this.renderer.setClearColor(0xb9d3ff, 1);                  //设置背景颜色

    return (
      <div ref={this.divRef}></div>
    );
  }

  componentDidMount() {
    this.divRef.current.appendChild(this.renderer.domElement)
    
    const loader = new GLTFLoader();

    console.log(loader);
    loader.load( 'mario/scene.gltf', ( gltf ) => {

      this.scene.add( gltf.scene );

      // 渲染器渲染
      this.handleRenderModel();

    }, undefined, function ( error ) {

      console.error( 'loader error', error );

    });

    this.controls.addEventListener('change', this.handleRenderModel);   //监听鼠标、键盘事件
  }
}

export default Model;