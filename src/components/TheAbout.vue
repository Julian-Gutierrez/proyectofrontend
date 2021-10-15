<template>
  <v-card
    class="mx-auto"
    color="#26c6da"
    dark
    max-width="400"
  >
    <v-card-title>
      <v-icon
        large
        left
      >
        mdi-beer
      </v-icon>
      <span class="text-h6 font-weight-light">Domicilios REFRESK T</span>
    </v-card-title>

    <v-card-text class="text-h5 font-weight-bold">
      "Disfruta tus más refrescantes bebidas en tu domicilio desde nuestra tienda virtual."
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://image.freepik.com/psd-gratis/maqueta-botella-cerveza-vista-frontal_1332-6349.jpg"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Refreskar-t@gmail.com</v-list-item-title>
        </v-list-item-content>

        
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
      name:'TheAbout'
  }
</script>