import mStyle from "./App.profile.module.scss";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';



export default function SkinScene() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null); // Ссылка на родительский div
    const [model, setModel] = useState(null);
    const [camera, setCamera] = useState(null); // Добавляем состояние для камеры


    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;

        // Принудительно создаем WebGL 1 контекст
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
        if (!gl) {
            console.error("WebGL 1 не поддерживается!");
            return;
        }

        // Создаем рендерер с WebGL
        const renderer = new THREE.WebGLRenderer({ canvas, context: gl, powerPreference: "high-performance" });
        renderer.setSize(container.offsetWidth, container.offsetHeight); // Привязываем размер канваса к div

        // Создаем сцену
        const scene = new THREE.Scene();

        // Создаем камеру
        const newCamera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 100);
        newCamera.position.set(0, 1.3, 2); // Камера настроена так, чтобы объект был видим
        setCamera(newCamera); // Сохраняем камеру в state

        // Добавляем свет
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, -1, 2).normalize();
        scene.add(light);

        // Загружаем модель с помощью GLTFLoader
        const loader = new GLTFLoader();
        loader.load('/steve.glb', (gltf) => {
            const loadedModel = gltf.scene;
            
            // Масштабируем модель, чтобы она поместилась в поле зрения камеры
            const k = 1.2;
            loadedModel.scale.set(k, k, k); // Уменьшаем модель

                          // Загрузка скина
      const textureLoader = new THREE.TextureLoader();
      const skinTexture = textureLoader.load("https://crafatar.com/skins/069a79f4-44e9-4726-a5be-fca90e38aaf5");  // Путь к вашему скину
            loadedModel.material = skinTexture;
            
            scene.add(loadedModel);
            setModel(loadedModel); // Сохраняем модель в state

            // Анимация
            function animate() {
                requestAnimationFrame(animate);
                renderer.render(scene, newCamera);
            }
            animate();
        }, undefined, (error) => {
            console.error('Ошибка при загрузке модели', error);
        });


      

        // Обновляем размер рендера при изменении размеров контейнера
        const onResize = () => {
            renderer.setSize(container.offsetWidth, container.offsetHeight);
            newCamera.aspect = container.offsetWidth / container.offsetHeight;
            newCamera.updateProjectionMatrix();
        };

        window.addEventListener("resize", onResize);

        // Убираем слушатель при удалении компонента
        return () => {
            window.removeEventListener("resize", onResize);
            renderer.dispose();
        };
    }, []);

    // Отслеживаем движение курсора
    useEffect(() => {
        if (!model || !camera) return;

        const head1 = model.getObjectByName('head_11');
        const head2 = model.getObjectByName('head_10');

    const onMouseMove = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2; // Центр канваса по X
        const centerY = rect.top - rect.height * 2/3;  // Центр канваса по Y
    
        // Получаем координаты курсора
        const cursorX = event.clientX; // Относительно окна браузера
        const cursorY = event.clientY;
        const z = -2;
        // Вычисляем направление от центра канваса к курсору
        const direction = new THREE.Vector3(
            (cursorX - centerX) / -rect.width * 2,  // Преобразуем в диапазон от -1 до 1
            -(cursorY - centerY) / -rect.height * 2, // Преобразуем в диапазон от -1 до 1
            z // Задаем Z координату, чтобы вектор имел глубину
        );
    
        // Применяем направление для поворота головы
        if (head1) {
            // Поворачиваем голову на вектор
            head1.lookAt(direction);
        }
    };
    
        window.addEventListener("mousemove", onMouseMove);

        // Убираем слушатель при размонтировании компонента
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, [model, camera]); // Добавляем camera в зависимости

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height:"100%",
                position: "relative", // Для того, чтобы canvas внутри мог адаптироваться
            }}
        >
            <canvas ref={canvasRef} />
        </div>
    );
}
