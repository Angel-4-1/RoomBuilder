export const TRANSLATIONS = {
  introStage: {
    title: ["ROOM BUILDER", "ROOM BUILDER"],
    subtitle: [
      "A place where you can design scenes using different types of objects", 
      "Un lugar en el que podras diseñar escenas utilizando distintos tipos de objetos"
    ],
    message: {
      top: ["Room", "Room"],
      bottom: ["Builder", "Builder"],
    },
  },

  roomSelectionStage: {
    title: ["Select a room", "Selecciona una sala"],
    buttons: {
      createRoom: ["Create a new room", "Crear una nueva sala"]
    },
    popUp : {
      title: ["Room set up", "Configuración de la sala"],
      name: ["Name", "Nombre"],
      description: ["Description", "Descripción"],
      mandatory: ["* mandatory", "* obligatorio"],
      placeholder: {
        name: ["Enter the room name", "Introduzca el nombre de la sala"],
        description: ["Enter the room description", "Introduzca la descripción de la sala"],
      },
      buttons: {
        create: ["Create", "Crear"],
        cancel: ["Cancel", "Cancelar"],
      },
    },
    message: {
      top: ["Select", "Selecciona"],
      bottom: ["a room", "una sala"],
    }
  },

  playStage: {
    language: {
      title: ["Language selected", "Lenguaje seleccionado"]
    },
    buttons: {
      back: ["Back", "Atras"],
      editor: ["Go to editor", "Ir al editor"],
      map: {
        download: ["Download map", "Descargar mapa"],
      }
    },
    alertMsg: {
      mapDownloaded: ["Map successfully downloaded", "Mapa descargado correctamente"],
      mapDownloadedError: ["Sorry, something went wrong", "Lo siento, algo ha ido mal"],
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