import { defineStore } from 'pinia'

export const useCounterStore = defineStore('messageTxt', {
    state: () => {
        return { inputMessage: '' }
      },
    //   getters: {
    //     double: (state) => state.inputMessage * 2,
    //   },
      actions: {
        setInput(newvalue) {
         this.inputMessage=newvalue
        },
      },
})


// import { useRouter } from 'vue-router'
// const router = useRouter()
  