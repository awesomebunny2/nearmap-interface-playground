import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Paper,
    Stack,
    Typography,
    Tabs,
    Tab,
    AppBar,
    TextField,
    Card,
    Divider,
    Checkbox,
    ToggleButton,
    ToggleButtonGroup,
    styled,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import theme from "./theme";

const cardItems = [
    'Active Ponding', 
    'Exposed Deck',
    'Exposed Underlayment',
    'Missing Roof Tile Or Shingle',
    'Structural Damage',
    'Roof With TemporaryRepair',
    'Roof With PermanentRepair',
    'Roof Patching',
    'Roof Ponding',
    'Roof Rusting',
    'Worn Shingles',
    'Roof Debris',
    'Zinc Staining',
    'Tile Or Shingle Staining',
    'Roof Staining',
];

function TabPanel({value, index, children, ...other}) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box
                    sx={{
                        p: 3,
                        height: "100%",
                        width: "100%",
                        boxSizing: "border-box",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 0,
                        overflow: "visible",
                    }}
                >
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function App() {

    const [value, setValue] = useState(0);
    const [cap, setCap] = useState("");
    const [filterMode, setFilterMode] = useState("include");
    const [isCapFocused, setIsCapFocused] = useState(false);

    const handleFilterMode = (event, newMode) => {
        if (newMode !== null) {
            setFilterMode(newMode);
        }
    };

    const includeButtonSx = {
        color: '#166534',
        backgroundColor: '#f0fdf4',
        border: '1px solid #d1d5db',
        '&:hover': {
            backgroundColor: '#dcfce7',
        },
        '&.Mui-selected': {
        backgroundColor: '#86efac',
        color: '#166534',
        border: '1px solid #d1d5db',
        },
        '&.Mui-selected:hover': {
        backgroundColor: '#4ade80',
        },
        '&.MuiToggleButtonGroup-grouped': {
        border: '1px solid #d1d5db',
        },
    }

    const excludeButtonSx = {
        color: '#991b1b',
        backgroundColor: '#fef2f2',
        border: '1px solid #d1d5db',
        '&:hover': {
            backgroundColor: '#fee2e2',
        },
        '&.Mui-selected': {
            backgroundColor: '#fca5a5',
            color: '#991b1b',
            border: '1px solid #d1d5db',
        },
        '&.Mui-selected:hover': {
            backgroundColor: '#f87171',
        },
        '&.MuiToggleButtonGroup-grouped': {
            border: '1px solid #d1d5db',
        },
    }

    const [selectedCards, setSelectedCards] = useState(
        () => Array.from({ length: cardItems.length }, () => "none")
    );

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCapChange = (event) => {
        const nextValue = event.target.value;
        if (nextValue === "" || /^\d+$/.test(nextValue)) {
            setCap(nextValue);
        }
    };

    const toggleCard = (index) => {
        setSelectedCards((prev) => {
            const next = [...prev];
            const current = next[index];
            if (filterMode === "include") {
                next[index] = current === "include" ? "none" : "include";
            } else {
                next[index] = current === "exclude" ? "none" : "exclude";
            }
            return next;
        });
    };

    const capNumber = Number(cap);
    const hasCapValue = Number.isFinite(capNumber) && capNumber > 0;
    const isSingleRecord = capNumber === 1;
    const isCapped = hasCapValue;
    const capStrongColor = "rgb(255, 165, 0)";
    const capSoftColor = "rgba(255, 165, 0, 0.7)";
    const capOutlineSoftColor = "rgba(255, 165, 0, 0.5)";

    useEffect(() => {
        setSelectedCards((prev) => {
            if (prev.length === cardItems.length) return prev;
            return Array.from({ length: cardItems.length }, (_, index) => prev[index] ?? "none");
        });
    }, [cardItems.length]);

    return (
        <Box
            sx={{
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            p: 2,
            boxSizing: "border-box",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    width: "80%",
                    height: "80%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: (theme.vars || theme).shape.borderRadius * 2,
                }}
            >
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{
                        borderTopLeftRadius: "inherit",
                        borderTopRightRadius: "inherit",
                        overflow: "hidden",
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        centered
                        sx={(theme) => ({
                            minHeight: "unset",
                            mb: "-1px",
                            borderTopLeftRadius: "inherit",
                            borderTopRightRadius: "inherit",
                            "& .MuiTabs-indicator": {
                                display: 'none',
                            },
                            "& .MuiTab-root": {
                                borderTopLeftRadius: (theme.vars || theme).shape.borderRadius * 2.5,
                                borderTopRightRadius: (theme.vars || theme).shape.borderRadius * 2.5,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                                minHeight: 36,
                                border: "1px solid transparent",
                                borderBottomWidth: 0,
                                "&:hover, &:focus-visible": {
                                bgcolor: "action.hover",
                                },
                                "&.Mui-selected": {
                                bgcolor: "background.paper",
                                borderColor: "divider",
                                },
                                "& .MuiTouchRipple-root": {
                                display: "none",
                                },
                            },
                        })}
                    >
                        <Tab label="Method One" {...a11yProps(0)} />
                        <Tab label="Method Two" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} style={{ flexGrow: 1, width: "100%", minHeight: 0, display: "flex" }}>
                    <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
                        <Box sx={{ px: 2 , pb: 2 }}>
                            <Box
                                sx={(theme) => ({
                                    display: "flex",
                                    justifyContent: "center",
                                })}
                            >
                                <Stack
                                    spacing={0.25}
                                    alignItems="flex-end"
                                    sx={(theme) => ({
                                        width: "100%",
                                    })}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={(theme) => ({
                                            fontWeight: 700,
                                            fontSize: "0.75rem",
                                            color: filterMode === "include" ? "#166534" : "#991b1b",
                                            width: "100%",
                                            textAlign: "center",
                                            transform: filterMode === "include" ? "translateX(-25%)" : "translateX(25%)",
                                            transition: "transform 180ms ease",
                                        })}
                                    >
                                        {filterMode === "include" ? "INCLUDES" : "EXCLUDES"}
                                    </Typography>
                                    <ToggleButtonGroup
                                        value={filterMode}
                                        exclusive
                                        onChange={handleFilterMode}
                                        aria-label="include or exclude with live status"
                                        size="small"
                                        sx={(theme) => ({
                                            width: "100%",
                                            columnGap: 1,
                                            "& .MuiToggleButtonGroup-grouped": {
                                                borderLeft: "1px solid #d1d5db",
                                            },
                                            "& .MuiToggleButtonGroup-firstButton": {
                                                borderTopRightRadius: (theme.vars || theme).shape.borderRadius * 2,
                                                borderBottomRightRadius: (theme.vars || theme).shape.borderRadius * 2,
                                            },
                                            "& .MuiToggleButtonGroup-lastButton": {
                                                borderTopLeftRadius: (theme.vars || theme).shape.borderRadius * 2,
                                                borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius * 2,
                                                borderLeft: "1px solid #d1d5db",
                                            },
                                            "& .MuiToggleButtonGroup-middleButton": {
                                                borderRadius: (theme.vars || theme).shape.borderRadius * 2,
                                            },
                                        })}
                                    >
                                        <ToggleButton
                                            value="include"
                                            aria-label="include"
                                            sx={(theme) => ({
                                                ...includeButtonSx,
                                                px: 0.75,
                                                py: 0,
                                                minHeight: 30,
                                                flex: 1,
                                                borderTopLeftRadius: (theme.vars || theme).shape.borderRadius * 2,
                                                borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius * 2,
                                                borderTopRightRadius: (theme.vars || theme).shape.borderRadius * 2,
                                                borderBottomRightRadius: (theme.vars || theme).shape.borderRadius * 2,
                                            })}
                                        >
                                            <CheckCircleOutlineIcon fontSize="small" />
                                        </ToggleButton>
                                        <ToggleButton
                                            value="exclude"
                                            aria-label="exclude"
                                            sx={(theme) => ({
                                                ...excludeButtonSx,
                                                px: 0.75,
                                                py: 0,
                                                minHeight: 30,
                                                flex: 1,
                                                borderTopRightRadius: (theme.vars || theme).shape.borderRadius * 2,
                                                borderBottomRightRadius: (theme.vars || theme).shape.borderRadius * 2,
                                                borderTopLeftRadius: (theme.vars || theme).shape.borderRadius * 2,
                                                borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius * 2,
                                            })}
                                        >
                                            <CancelOutlinedIcon fontSize="small" />
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Stack>
                            </Box>
                        </Box>

                        <Divider sx={{ mx: 2, height: 2, bgcolor: "divider" }} />

                        <Box sx={{ flexGrow: 1, overflowY: "auto", pt: 2, px: 2, pb: 0, minHeight: 0 }}>
                            <Stack spacing={2} sx={{ overflow: "visible", mb: 3 }}>
                            {cardItems.map((item, index) => {
                                const state = selectedCards[index];
                                const isIncluded = state === "include";
                                const isExcluded = state === "exclude";
                                const accent = isIncluded ? "#16a34a" : isExcluded ? "#dc2626" : "#d1d5db";
                                const hoverGlow = filterMode === "include"
                                    ? "rgba(22, 163, 74, 0.12)"
                                    : "rgba(220, 38, 38, 0.12)";

                                return (
                                    <Card
                                        key={`card-${index}`}
                                        variant="elevation"
                                        elevation={0}
                                        onClick={() => toggleCard(index)}
                                        sx={(theme) => ({
                                            height: 60,
                                            maxHeight: 60,
                                            flexShrink: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            position: "relative",
                                            px: 1.5,
                                            gap: 0.75,
                                            cursor: "pointer",
                                            border: "none",
                                            backgroundColor: isIncluded
                                                ? "rgba(22, 163, 74, 0.08)"
                                                : isExcluded
                                                ? "rgba(220, 38, 38, 0.08)"
                                                : "background.paper",
                                            boxShadow: "0 1px 4px rgba(0, 0, 0, 0.12)",
                                            transition: "transform 160ms ease, box-shadow 160ms ease, background-color 160ms ease",
                                            "&:hover": {
                                                transform: "translateY(-2px)",
                                                boxShadow: `0 4px 12px rgba(0, 0, 0, 0.16), 0 0 0 1px ${hoverGlow}`,
                                                backgroundColor:
                                                    filterMode === "include"
                                                        ? "rgba(22, 163, 74, 0.04)"
                                                        : "rgba(220, 38, 38, 0.04)",
                                            },
                                            [theme.breakpoints.down(699)]: {
                                                flexDirection: "column",
                                                alignItems: "stretch",
                                                height: "auto",
                                                maxHeight: "none",
                                                py: 1,
                                            },
                                        })}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                        <Checkbox
                                            checked={selectedCards[index] !== "none"}
                                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                            checkedIcon={
                                                isIncluded
                                                    ? <CheckCircleOutlineIcon sx={{ color: "#16a34a" }} fontSize="small" />
                                                    : <CancelOutlinedIcon sx={{ color: "#dc2626" }} fontSize="small" />
                                            }
                                            onChange={() => toggleCard(index)}
                                            onClick={(event) => event.stopPropagation()}
                                            size="small"
                                        />
                                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ fontWeight: 700, maxWidth: 200, whiteSpace: "normal" }}
                                            >
                                                {item}
                                            </Typography>
                                        </Box>
                                        </Box>
                                        <Box
                                            sx={(theme) => ({
                                                ml: "auto",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "flex-end",
                                                justifyContent: "center",
                                                gap: 0.25,
                                                [theme.breakpoints.down(699)]: {
                                                    width: "100%",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    mt: -1,
                                                    gap: 4,
                                                },
                                                [theme.breakpoints.down(500)]: {
                                                    gap: 2.5,
                                                },
                                                [theme.breakpoints.up(1000)]: {
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    gap: 1.5,
                                                },
                                            })}
                                        >
                                            <Typography
                                                variant="caption"
                                                sx={(theme) => ({
                                                    fontWeight: 500,
                                                    color: "text.secondary",
                                                    opacity: 0.75,
                                                    [theme.breakpoints.down(699)]: {
                                                        position: "static",
                                                        transform: "none",
                                                        textAlign: "left",
                                                    },
                                                    [theme.breakpoints.down(500)]: {
                                                        maxWidth: 110,
                                                        textAlign: "center",
                                                        whiteSpace: "normal",
                                                    },
                                                    [theme.breakpoints.up(1000)]: {
                                                        position: "absolute",
                                                        left: "65%",
                                                        top: "50%",
                                                        transform: "translate(-50%, -50%)",
                                                        textAlign: "center",
                                                    },
                                                })}
                                            >
                                                Total:{" "}
                                                <Box
                                                    component="span"
                                                    sx={(theme) => ({
                                                        fontWeight: 600,
                                                        color: "text.secondary",
                                                        fontSize: "0.75rem",
                                                        [theme.breakpoints.down(500)]: {
                                                            display: "block",
                                                        },
                                                    })}
                                                >
                                                    70,000
                                                </Box>
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={(theme) => ({
                                                    fontWeight: 600,
                                                    color: "text.secondary",
                                                    whiteSpace: "nowrap",
                                                    [theme.breakpoints.up(1000)]: {
                                                        textAlign: "right",
                                                    },
                                                    [theme.breakpoints.down(500)]: {
                                                        whiteSpace: "normal",
                                                        maxWidth: 120,
                                                        textAlign: "center",
                                                    },
                                                })}
                                            >
                                                Available To Add:{" "}
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        fontWeight: 800,
                                                        color: isIncluded ? "#16a34a" : isExcluded ? "#dc2626" : "text.primary",
                                                        fontSize: "0.875rem",
                                                        [theme.breakpoints.down(500)]: {
                                                            display: "block",
                                                        },
                                                    }}
                                                >
                                                    +50,000
                                                </Box>
                                            </Typography>
                                        </Box>
                                    </Card>
                                );
                            })}
                            </Stack>
                        </Box>

                        <Divider sx={{ mx: 2, height: 2, mb: 2, bgcolor: "divider" }} />

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                px: 2,
                                mt: 1,
                            }}
                        >
                            <Box
                                sx={(theme) => ({
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    mb: 2,
                                    gap: 2,
                                    [theme.breakpoints.down(775)]: {
                                        flexDirection: "column",
                                        alignItems: "stretch",
                                        gap: 1,
                                    },
                                })}
                            >
                                <Box
                                    sx={(theme) => ({
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        flex: 1,
                                        [theme.breakpoints.down(775)]: {
                                            width: "100%",
                                        },
                                    })}
                                >
                                    <TextField
                                        label="Cap"
                                        value={cap}
                                        onChange={handleCapChange}
                                        onFocus={() => setIsCapFocused(true)}
                                        onBlur={() => setIsCapFocused(false)}
                                        type="text"
                                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                        size="small"
                                        sx={(theme) => ({
                                            width: hasCapValue ? "250px" : "100%",
                                            flexGrow: 1,
                                            minWidth: hasCapValue ? "250px" : 0,
                                            [theme.breakpoints.down(775)]: {
                                                width: hasCapValue ? "calc(100% - 90px)" : "100%",
                                            },
                                            "& .MuiInputLabel-root.Mui-focused": {
                                                color: capStrongColor,
                                            },
                                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                borderColor: capStrongColor,
                                            },
                                            "& .MuiInputLabel-root": {
                                                color: hasCapValue && !isCapFocused ? capSoftColor : undefined,
                                            },
                                            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                                                borderColor: hasCapValue && !isCapFocused ? capOutlineSoftColor : undefined,
                                            },
                                        })}
                                    />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        display: "inline-flex",
                                        maxWidth: hasCapValue ? (isSingleRecord ? 70 : 90) : 0,
                                        opacity: hasCapValue ? 1 : 0,
                                        marginLeft: hasCapValue ? 1 : 0,
                                        transform: hasCapValue ? "translateX(0)" : "translateX(-6px)",
                                        transition: "opacity 250ms ease, transform 250ms ease, max-width 250ms ease, margin-left 250ms ease",
                                        overflow: "hidden",
                                        color: isCapFocused ? capStrongColor : capSoftColor,
                                        fontSize: "0.95rem",
                                        fontWeight: 600,
                                        pointerEvents: "none",
                                        whiteSpace: "nowrap",
                                        }}
                                    >
                                    {isSingleRecord ? "record" : "records"}
                                </Typography>
                                </Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 600,
                                        color: "text.secondary",
                                        fontSize: "1.5rem",
                                        textAlign: "right",
                                        [theme.breakpoints.down(775)]: {
                                            textAlign: "center",
                                        },
                                    }}
                                >
                                    Running Total:{" "}
                                    <Box component="span" sx={{ fontWeight: 600, color: "text.primary", fontSize: "inherit" }}>
                                        100,000
                                    </Box>
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                onClick={() => console.log("Export")}
                                sx={{ width: "100%", alignSelf: "center" }}
                            >
                                Export
                            </Button>
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1} style={{ flexGrow: 1 }}>
                    <Stack spacing={2}>
                        <Typography variant="h4">
                            Method poo 💩
                        </Typography>

                        <Button variant="contained">
                            Contained Button
                        </Button>

                        <Button variant="outlined">
                            Outlined Button
                        </Button>
                    </Stack>
                </TabPanel>
            </Paper>
        </Box>
    );
}

export default App;
