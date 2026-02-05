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
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
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
const tiers = ["Tier 1", "Tier 2", "Tier 3", "Tier 4"];

function ToggleHeader({ filterMode, handleFilterMode }) {
    return (
        <Box sx={{ px: 2, pb: 2 }}>
            <ToggleButtonGroup
                value={filterMode}
                exclusive
                onChange={handleFilterMode}
                fullWidth
                aria-label="include or exclude"
            >
                <ToggleButton value="include" aria-label="include">
                    <CheckCircleOutlineIcon fontSize="small" />
                </ToggleButton>
                <ToggleButton value="exclude" aria-label="exclude">
                    <CancelOutlinedIcon fontSize="small" />
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}

function TriStateCheckbox({ value, onChange }) {
    const checked = value === "checked";
    const indeterminate = value === "x";

    const cycle = () => {
        const next =
            value === "unchecked" ? "checked" : value === "checked" ? "x" : "unchecked";
        onChange(next);
    };

    return (
        <Checkbox
            checked={checked}
            indeterminate={indeterminate}
            onChange={cycle}
            icon={<CheckBoxOutlineBlankIcon />}
            checkedIcon={<CheckBoxIcon />}
            indeterminateIcon={<CloseIcon />}
            inputProps={{ "aria-label": "tri-state checkbox" }}
        />
    );
}

function CardListSection({ items, selectedCards, onToggle }) {
    return (
        <Box sx={{ flexGrow: 1, overflowY: "auto", pt: 2, px: 2, pb: 2, minHeight: 0 }}>
            <Stack spacing={2}>
                {items.map((item, index) => {
                    const state = selectedCards[index];
                    const isIncluded = state === "include";
                    const isExcluded = state === "exclude";

                    return (
                        <Card
                            key={`${item}-${index}`}
                            variant="outlined"
                            onClick={() => onToggle(index)}
                            sx={{ display: "flex", alignItems: "center", px: 1.5, py: 1, gap: 1, cursor: "pointer" }}
                        >
                            <Checkbox
                                checked={selectedCards[index] !== "none"}
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={
                                    isIncluded
                                        ? <CheckCircleOutlineIcon fontSize="small" />
                                        : <CancelOutlinedIcon fontSize="small" />
                                }
                                onChange={() => onToggle(index)}
                                onClick={(event) => event.stopPropagation()}
                                size="small"
                            />
                            <Typography variant="subtitle2">{item}</Typography>
                            <Box sx={{ ml: "auto", display: "flex", gap: 2 }}>
                                <Typography variant="caption">Total: 70,000</Typography>
                                <Typography variant="caption">Available To Add: +50,000</Typography>
                            </Box>
                        </Card>
                    );
                })}
            </Stack>
        </Box>
    );
}

function BottomSection({ cap, handleCapChange }) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, px: 2, mt: 1 }}>
            <Box sx={{ display: "flex", mb: 2, alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <TextField
                    label="Cap"
                    value={cap}
                    onChange={handleCapChange}
                    type="text"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    size="small"
                />
                <Typography variant="body1" sx={{ textAlign: "right" }}>
                    Running Total:{" "}
                    <Box component="span">
                        100,000
                    </Box>
                </Typography>
            </Box>
            <Button
                variant="contained"
                onClick={() => console.log("Export")}
                sx={{ width: "100%" }}
            >
                Export
            </Button>
        </Box>
    );
}

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
    const [capTwo, setCapTwo] = useState("");
    const [filterMode, setFilterMode] = useState("include");

    const handleFilterMode = (event, newMode) => {
        if (newMode !== null) {
            setFilterMode(newMode);
        }
    };

    // Keep default MUI styling for review simplicity.

    const [selectedCards, setSelectedCards] = useState(
        () => Array.from({ length: cardItems.length }, () => "none")
    );
    const [selectedTiers, setSelectedTiers] = useState(
        () => Array.from({ length: tiers.length }, () => "none")
    );
    const [triStateValue, setTriStateValue] = useState("unchecked");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleCapChange = (setter) => (event) => {
        const nextValue = event.target.value;
        if (nextValue === "" || /^\d+$/.test(nextValue)) {
            setter(nextValue);
        }
    };

    const toggleCard = (setter, mode) => (index) => {
        setter((prev) => {
            const next = [...prev];
            const current = next[index];
            if (mode === "include") {
                next[index] = current === "include" ? "none" : "include";
            } else {
                next[index] = current === "exclude" ? "none" : "exclude";
            }
            return next;
        });
    };

    useEffect(() => {
        setSelectedCards((prev) => {
            if (prev.length === cardItems.length) return prev;
            return Array.from({ length: cardItems.length }, (_, index) => prev[index] ?? "none");
        });
    }, [cardItems.length]);

    useEffect(() => {
        setSelectedTiers((prev) => {
            if (prev.length === tiers.length) return prev;
            return Array.from({ length: tiers.length }, (_, index) => prev[index] ?? "none");
        });
    }, [tiers.length]);

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
                        <ToggleHeader
                            filterMode={filterMode}
                            handleFilterMode={handleFilterMode}
                        />

                        <Divider />

                        <CardListSection
                            items={cardItems}
                            selectedCards={selectedCards}
                            onToggle={toggleCard(setSelectedCards, filterMode)}
                        />

                        <Divider sx={{ mb: 2 }} />

                        <BottomSection
                            cap={cap}
                            handleCapChange={handleCapChange(setCap)}
                        />

                        <Card variant="outlined" sx={{ mx: 2, mt: 2, display: "flex", alignItems: "center", gap: 1, px: 1.5, py: 1 }}>
                            <TriStateCheckbox value={triStateValue} onChange={setTriStateValue} />
                            <Typography variant="body2">Tri-state checkbox demo</Typography>
                        </Card>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1} style={{ flexGrow: 1 }}>
                    <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
                        <CardListSection
                            items={tiers}
                            selectedCards={selectedTiers}
                            onToggle={toggleCard(setSelectedTiers, "include")}
                        />

                        <BottomSection
                            cap={capTwo}
                            handleCapChange={handleCapChange(setCapTwo)}
                        />
                    </Box>
                </TabPanel>
            </Paper>
        </Box>
    );
}

export default App;
