import { ref } from 'vue'
import useSupabase from 'boot/supabase'

// o usuário é definido fora da função useAuthUser para que atue como um estado global
// e sempre se refira a um único usuário
const user = ref(null)

export default function useAuthUser () {
  const { supabase } = useSupabase()
  /**
   * Login com e-mail e senha
   */
  const login = async ({ email, password }) => {
    const { user, error } = await supabase.auth.signIn({ email, password })
    if (error) throw error
    return user
  }

  /**
   * Faça login com google, github, etc.
   */
  const loginWithSocialProvider = async (provider) => {
    const { user, error } = await supabase.auth.signIn({ provider })
    if (error) throw error
    return user
  }

  /**
   * Logout
   */
  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  /**
   * Verifique se o usuário está logado ou não
   */
  const isLoggedIn = () => {
    return !!user.value
  }

  /**
   * Register
   */
  const register = async ({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        // metadados arbitrários são passados como segundo argumento sob uma chave de dados
        // para o método de inscrição Supabase
        data: meta,
        // o para redirecionar depois que o usuário confirmar seu e-mail
        // window.location não estaria disponível se estivéssemos renderizando o lado do servidor
        // mas como estamos todos no cliente, funcionará bem
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation"`
      })
    if (error) throw error
    return user
  }

  /**
   * Atualizar e-mail, senha ou metadados do usuário
   */
  const update = async (data) => {
    const { user, error } = await supabase.auth.update(data)
    if (error) throw error
    return user
  }

  /**
   * Envie ao usuário um e-mail para redefinir sua senha
   * (ou seja. suporte "Esqueceu a senha?")
   */
  const sendPasswordRestEmail = async (email) => {
    const { user, error } = await supabase.auth.api.resetPasswordForEmail(email)
    if (error) throw error
    return user
  }

  const resetPassword = async (accessToken, newPassword) => {
    const { user, error } = await supabase.auth.api.updateUser(
      accessToken,
      { password: newPassword }
    )
    if (error) throw error
    return user
  }

  return {
    user,
    login,
    loginWithSocialProvider,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordRestEmail,
    resetPassword
    // maybeHandleEmailConfirmation,
  }
}
