/* App — router + root */

function App() {
  const path = useHashRoute();
  const [videoId, setVideoId] = useState(null);

  useReveal(); // re-runs on each render to pick up new .reveal elements

  let page;
  switch (path) {
    case '/programs':  page = <PagePrograms />; break;
    case '/schedule':  page = <PageSchedule />; break;
    case '/portfolio': page = <PagePortfolio onPlayVideo={setVideoId} />; break;
    case '/about':     page = <PageAbout />; break;
    case '/faq':       page = <PageFAQ />; break;
    case '/contact':   page = <PageContact />; break;
    default:           page = <PageHome onPlayVideo={setVideoId} />;
  }

  return (
    <React.Fragment>
      <ScrollProgress />
      <Nav path={path} />
      <main key={path}>{page}</main>
      <Footer />
      {videoId && <YouTubeModal videoId={videoId} onClose={() => setVideoId(null)} />}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
