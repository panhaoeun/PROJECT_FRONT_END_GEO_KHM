export default async function ({
    $auth,
    redirect
}) {
    console.log($auth)
    if ($auth.user) {
        redirect('/')
    }
}