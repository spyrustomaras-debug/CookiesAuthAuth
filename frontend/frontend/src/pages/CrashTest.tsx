const CrashTest: React.FC = () => {
  throw new Error("💥 Test crash to check Sentry ErrorBoundary!");
};

export default CrashTest