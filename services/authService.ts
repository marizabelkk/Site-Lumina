import { supabase } from "@/lib/supabase";

function ensureSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase nao esta configurado. Verifique NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  return supabase;
}

export async function signInAdmin(email: string, password: string) {
  const client = ensureSupabase();
  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error("E-mail ou senha invalidos. Confira os dados e tente novamente.");
  }

  return data.session;
}

export async function signOutAdmin() {
  const client = ensureSupabase();
  const { error } = await client.auth.signOut();

  if (error) {
    throw new Error("Nao foi possivel sair agora. Tente novamente.");
  }
}

export async function getCurrentSession() {
  const client = ensureSupabase();
  const { data, error } = await client.auth.getSession();

  if (error) {
    throw new Error("Nao foi possivel verificar sua sessao.");
  }

  return data.session;
}
