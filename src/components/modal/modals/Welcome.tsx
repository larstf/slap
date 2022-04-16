import router from 'next/router';

const WelcomeModal: React.FC = () => {

  const loginWithDiscord = () => {
    router.push(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/discord?redirect_uri=${window.location.href.split('?')[0]}`,
    );
  }

  return (
    <div className="p-4 pt-0">
      <p>To hunt ice bears you must first login using Discord</p>
      <button
        onClick={() => loginWithDiscord()}
        className="mt-4 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-discord text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm">
        Login with Discord
      </button>
    </div>
  )
}

export default WelcomeModal;