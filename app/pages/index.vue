<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import { useLoginMicrosoft } from '~/utils/loginMicrosoft'
import { authLoginSocialNetwork } from '~/utils/authLoginSocialNetwork'
import { setData } from 'nuxt-storage/local-storage'

const storeMicrosoft = useLoginMicrosoft()
const toast = useToast()
const loading = ref(false)

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox'
}]

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
}

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

const providers = [{
  label: 'Microsoft',
  icon: 'i-simple-icons-microsoft',
  onClick: async () => {
    loading.value = true
    await storeMicrosoft.signIn()
    loading.value = false
    const cancelLogin = storeMicrosoft.getCancelLogin()

    if (!cancelLogin) {
      try {
        const userToken = storeMicrosoft.getToken();
        const userSocialData = storeMicrosoft.getDataLogin();

        if (userToken) {
          // setData('userData', userSocialData)
          setData('token', userToken)
          // setData('socialType', 'microsoft')

          console.log({ userSocialData })
          console.log({ userToken })
          
          const data = await authLoginSocialNetwork({
            token: userToken,
            socialData: userSocialData,
            type: 'microsoft'
          })
          
          console.log({ data })
        }

      } catch (error) {
        toast.add({ title: 'Error', description: 'Unable to process request' })
        console.error('Error during social login:', error)
      }
    }

    if (cancelLogin) {
      toast.add({ title: 'Microsoft', description: 'Login cancelled' })
    }
  }
}]

type Schema = z.output<typeof schema>

</script>
<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Login"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :fields="fields"
        :providers="providers"
        :loading="loading"
        @submit="onSubmit"
      />
    </UPageCard>
  </div>
</template>
