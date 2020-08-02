# nodejs-模块  
1.commonJs是一个标准，用于实现js的模块化的一种实现  
2.nodejs中模块分为核心模块和文件模块，核心模块是node自带的，文件模块是第三方和自定义的模块   
3.模块暴露使用exports和module.exports导出模块  
4.两种导出方式有区别，使用exports导出会多包一层属性  
5.nodejs找包的方式有几种，需要体会其中的不同  
6.一般我们的自定义包都需要放在node_modules下，并通过package.json配置，这样更加规范   