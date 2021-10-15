<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="categorias"
      sort-by="nombre"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Categorias CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Crear Categoria
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-textarea
                        no-resize
                        auto-grow
                        v-model="editedItem.descripcion"
                        label="Descripción"
                      ></v-textarea>
                    </v-col>

                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.estado"
                        label="Estado"
                      ></v-text-field>
                    </v-col> -->

                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Guardar </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h6"
                >Está seguro de cambiar el estado de la Categoria?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Aceptar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)" v-if="item.estado == 1" >mdi-toggle-switch  </v-icon>
        <v-icon small @click="deleteItem(item)" v-else >mdi-toggle-switch-off  </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CategoriasDT',
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "_id",
      },
      { text: "Nombre", value: "nombre" },
      { text: "Descripcion", value: "descripcion" },
      /* { text: "Rol", value: "rol" },*/
      { text: "Estado", value: "estado" }, 
      { text: "Edit", value: "actions", sortable: false },
    ],
    categorias: [],
    editedIndex: -1,
    editedItem: {
        _id: "",
        nombre: "",
        descripcion: "",
        estado: ""
    },
    defaultItem: {
        _id: "",
        nombre: "",
        descripcion: "",
        estado: ""
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Crear Categoria" : "Editar Categoria";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    //this.initialize();
    this.list();
  },

  methods: {
    initialize() {
      this.categorias = [
        {
          _id: "61622a551adfbed357cbfb41",
          nombre: "Gaseosas",
          descripcion: "Bebidas Gasificadas",
          estado: 1,
        }
      ];
    },

    list(){
        axios.get('http://localhost:3000/api/categoria/list')
            .then(response =>{
    // handle success
        this.categorias = response.data;
             console.log(response);
        })
            .catch(error =>{
    // handle error
            console.log(error);
        })
    },

    editItem(item) {
      this.editedIndex = this.categorias.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.categorias.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      //this.categorias.splice(this.editedIndex, 1);
      if (this.editedItem.estado === 1) {
          axios.put('http://localhost:3000/api/categoria/disabled',{
            estado: 0,
            _id: this.editedItem._id,
        })
        .then(response => {
            this.list();
        })
        .catch(error =>{
            console.log(error)
        })
          
      } else {
          axios.put('http://localhost:3000/api/categoria/enabled',{
            estado: 1,
            _id: this.editedItem._id
        })
        .then(response => {
            this.list();
        })
        .catch(error =>{
            console.log(error)
        })
          
      }
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        //Object.assign(this.categorias[this.editedIndex], this.editedItem);
        axios.put('http://localhost:3000/api/categoria/update',{
            nombre: this.editedItem.nombre,
            descripcion: this.editedItem.descripcion,
            _id: this.editedItem._id
        })
        .then(response => {
            this.list();
        })
        .catch(error =>{
            console.log(error)
        })

      } else {
        //this.categorias.push(this.editedItem);

        axios.post('http://localhost:3000/api/categoria/add',{
            nombre: this.editedItem.nombre,
            descripcion: this.editedItem.descripcion,
        })
        .then(response => {
            this.list();
        })
        .catch(error =>{
            console.log(error)
        })
      }
      this.close();
    },
  },
};
</script>