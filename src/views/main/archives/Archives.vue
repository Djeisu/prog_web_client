<template>
  <v-container fluid fill-height>
    <input type="file" v-show="false" ref="file" multiple @change="save"/>
    <v-speed-dial v-model="fab" fixed bottom right>
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-account-circle</v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="green" @click="dialog = true">
        <v-icon>mdi-folder</v-icon>
      </v-btn>
      <v-btn fab dark small color="indigo" @click="addFile">
        <v-icon>mdi-file</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-row>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-card>
          <v-card-title>
            <v-btn icon>
              <v-icon color="grey lighten-1" @click="back()">mdi-arrow-left</v-icon>
            </v-btn>

            {{ current.title }}
          </v-card-title>
          <v-list two-line subheader>
            <v-subheader inset>Folders</v-subheader>
            <v-list-item v-for="item in folders" :key="item.id + item.title">
              <v-list-item-avatar v-if="item.folder_id === current.id">
                <v-icon class="blue white--text"> mdi-folder </v-icon>
              </v-list-item-avatar>
              <v-list-item-content @click="openFolder(item)" v-if="item.folder_id === current.id">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action v-if="item.folder_id === current.id">
                <v-btn icon>
                  <v-icon color="grey lighten-1" @click="destroyFolder(item.id)">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider inset></v-divider>
            <v-subheader inset>Files</v-subheader>
            <v-list-item v-for="item in archives" :key="item.id + item.title">
              <v-list-item-avatar v-if="item.folder_id === current.id">
                <v-icon class="amber white--text"> mdi-file </v-icon>
              </v-list-item-avatar>
              <v-list-item-content v-if="item.folder_id === current.id">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.type }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action v-if="item.folder_id === current.id">
                <v-menu bottom left>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" ripple>
                      <v-icon color="grey lighten-1">mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item @click="downloadFile(item)">
                      <v-list-item-title>
                        <v-icon color="grey lighten-1">mdi-download</v-icon> donwload
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="destroyFile(item.id)">
                      <v-list-item-title>
                        <v-icon color="grey lighten-1">mdi-delete</v-icon> delete
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>New Folder</v-card-title>
              <v-card-text>
                <v-text-field label="Name" v-model="nameFolder"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn text color="primary" @click="addFolder()">Create</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'archives',
  data() {
    return {
      nameFolder: null,
      dialog: false,
      fab: false,
      breadcrumbs: [
        {
          title: 'All',
          id: null,
        },
      ],
    };
  },
  computed: {
    archives() {
      return this.$store.state.archives;
    },
    folders() {
      return this.$store.state.folders;
    },
    current() {
      return this.breadcrumbs[this.breadcrumbs.length - 1];
    },
  },
  methods: {
    back() {
      if (this.breadcrumbs.length > 1) this.breadcrumbs.pop();
      this.$store.dispatch('getArchives', { folder: this.current.id });
      this.$store.dispatch('getFolders', { folder: this.current.id });
    },
    openFolder(folder) {
      this.breadcrumbs.push(folder);
      this.$store.dispatch('getArchives', { folder: folder.id });
      this.$store.dispatch('getFolders', { folder: folder.id });
    },
    addFolder() {
      this.$store.dispatch('newFolder', { name: this.nameFolder, folder: this.current.id });
      this.dialog = false;
    },
    destroyFolder(id) {
      this.$store.dispatch('destroyFolder', { id, folder: this.current.id });
    },
    addFile() {
      this.$refs.file.click();
    },
    destroyFile(id) {
      this.$store.dispatch('destroyArchive', { id, folder: this.current.id });
    },
    downloadFile(archive) {
      axios
        .get(`http://localhost:3000${archive.url}`, { responseType: 'arraybuffer' })
        .then((response) => {
          const { headers } = response;
          const blob = new Blob([response.data], { type: headers['content-type'] });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = archive.title;
          link.click();
        });
    },
    save() {
      const { files } = this.$refs.file;
      // eslint-disable-next-line
      for (let i = 0; i < files.length; i++) {
        this.$store.dispatch('newArchive', { file: files[i], folder: this.current.id });
      }
    },
  },
};
</script>
