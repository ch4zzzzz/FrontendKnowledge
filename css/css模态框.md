# css模态框

要点：

* 利用`:target`

```html
<style>

    #modal-container {
        display: none;
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
    }

    #modal-container:target {
        display: block;
    }

    #overlay {
        width: 100%;
        height: 100%;
        background: rgb(0, 0, 0, 0.6);
        position: absolute;
    }

    #modal {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 40%;
        height: 40%;
        margin: auto auto;
        background: white;
    }

</style>
<body>
    <a href="#modal-container">click</a>
    <div id="modal-container">
        <a href="#" id="overlay"></a>
        <div id="modal">
            This is my modal!
        </div>
  </div>
</body>
```



