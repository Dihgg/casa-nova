import Box, { BoxProps } from "@mui/system/Box";

const FullPageComponent = ({children, ...props}: BoxProps) => {
    return (
        <Box {...props} sx={{
            minHeight: '100vh',
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Box>
                {children}
            </Box>
        </Box>
    );
};

export default FullPageComponent;
