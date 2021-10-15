<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="usuarios"
      sort-by="rol"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Usuarios CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Crear Usuario
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
                    <v-col v-if="editedIndex === -1" cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.correo"
                        label="Correo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.rol"
                        label="Rol"
                        :items="roles"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.password"
                        label="Password"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.protein"
                        label="Protein (g)"
                      ></v-text-field>
                    </v-col> -->
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h6"
                >Está seguro de cambiar el estado del usuario?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
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
  name: 'UsuariosDT',
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
      { text: "Correo", value: "correo" },
      { text: "Rol", value: "rol" },
      { text: "Estado", value: "estado" },
      { text: "Edit", value: "actions", sortable: false },
    ],
    desserts: [],
    usuarios: [],
    roles:['Administrador','Gestor'],
    editedIndex: -1,
    editedItem: {
        _id: "",
        nombre: "",
        correo: "",
        rol: "",
        password: "",
      //protein: 0,
    },
    defaultItem: {
        _id: "",
        nombre: "",
        correo: "",
        rol: "",
        password: "",
      //protein: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Crear Usuario" : "Editar Usuario";
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
      this.desserts = [
        {
          _id: "61622a551adfbed357cbfb41",
          nombre: "julian",
          correo: "prueba@gmail.com",
          rol: "Administrador",
          estado: 1,
        }
      ];
    },

    list(){
        axios.get('http://localhost:3000/api/usuario/list')
            .then(response =>{
    // handle success
        this.usuarios = response.data;
             console.log(response);
        })
            .catch(error =>{
    // handle error
            console.log(error);
        })
    },

    editItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      //this.usuarios.splice(this.editedIndex, 1);
      if (this.editedItem.estado === 1) {
          axios.put('http://localhost:3000/api/usuario/disabled',{
            estado: 0,
            _id: this.editedItem._id,
            //password: this.editedItem.password
        })
        .then(response => {
            this.list();
        })
        .catch(error =>{
            console.log(error)
        })
          
      } else {
          axios.put('http://localhost:3000/api/usuario/enabled',{
            estado: 1,
            _id: this.editedItem._id
            //password: this.editedItem.password
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
        Object.assign(this.usuarios[this.editedIndex], this.editedItem);
        axios.put('http://localhost:3000/api/usuario/update',{
            nombre: this.editedItem.nombre,
            correo: this.editedItem.correo,
            rol: this.editedItem.rol,
            password: this.editedItem.password
        })
        .then(response => {
            this.list();
        })
        .catch(error =>{
            console.log(error)
        })

      } else {
        //this.usuarios.push(this.editedItem);

        axios.post('http://localhost:3000/api/usuario/add',{
            nombre: this.editedItem.nombre,
            correo: this.editedItem.correo,
            rol: this.editedItem.rol,
            password: this.editedItem.password
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
    
