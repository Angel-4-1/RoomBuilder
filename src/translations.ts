export const TRANSLATIONS = {
  introStage: ["WELCOME", "BIENVENIDO"],

  controls: {
    forward: {
      key: ["W", "W"],
      definition: ["Front", "Delante"],
    },
    backward: {
      key: ["S", "S"],
      definition: ["Back", "Detras"],
    },
    leftward: {
      key: ["A", "A"],
      definition: ["Left", "Izquierda"],
    },
    rightward: {
      key: ["D", "D"],
      definition: ["Right", "Derecha"],
    },
    run: {
      key: ["L Shift", "L Shift"],
      definition: ["Run", "Correr"],
    },
    jump: {
      key: ["Space", "Espacio"],
      definition: ["Jump", "Saltar"],
    },
    freeCamera: ["Free camera", "Camara libre"]
  },

  playStage: {
    language: {
      title: ["Language selected", "Lenguaje seleccionado"]
    },
    buttons: {
      back: ["Exit", "Salir"],
      editor: ["Go to editor", "Ir al editor"],
      map: {
        download: ["Download map", "Descargar mapa"],
      }
    }
  },

  editorStage: {
    buttons: {
      stopEditing: ["Stop editing", "Parar de editar"],
      item: {
        rotate: ["Rotate item", "Girar elemento"],
        move: ["Move item", "Mover elemento"],
        delete: ["Delete item", "Eliminar elemento"],
      },
      shop: ["Shop", "Tienda"],
      clean: {
        description: ["Remove everything", "Eliminar todo"],
        confirmation: ["This action will remove all the items\nAre you sure ?", "Esta acción va a eliminar todos los items\n¿Desea continuar?"],
      },
      map: {
        download: ["Download map", "Descargar mapa"],
        select: ["Select File", "Seleccionar archivo"],
        load: ["Load map", "Cargar mapa"],
      }
    },
    itemPreviewm : {
      title: ["Item preview", "Vista previa del elemento"]
    },
    alertMsg: {
      map: {
        success: ["Map successfully uploaded", "Mapa cargado correctamente"],
        error: ["There was a problem loading the map, check that the file is valid", "Hubo un problema al cargar el mapa, comprueba que el archivo sea válido"],
      },
      clean: ["All items have been removed", "Todos los elementos han sido eliminados"]
    }
  }
}